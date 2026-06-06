const CHANNEL_ID = 'UCSDmYNQ_kSGMp6sGbdA-BjQ'

export default async function handler(req, res) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY

    if (!apiKey) {
      return res.status(500).json({ error: 'Missing YouTube API key' })
    }

    // Step 1 — Get the uploads playlist ID for the channel
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${apiKey}`
    )
    const channelData = await channelRes.json()

    const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads

    if (!uploadsPlaylistId) {
      return res.status(404).json({ error: 'Could not find uploads playlist' })
    }

    // Step 2 — Fetch latest 12 videos from uploads playlist
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=12&key=${apiKey}`
    )
    const videosData = await videosRes.json()

    const videos = (videosData.items ?? []).map(item => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails?.high?.url ?? item.snippet.thumbnails?.default?.url,
      publishedAt: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
    }))

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    res.status(200).json({ videos })

  } catch (err) {
    console.error('YouTube API error:', err)
    res.status(500).json({ error: 'Failed to fetch DJ sets' })
  }
}
