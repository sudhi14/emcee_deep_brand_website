const ARTIST_ID = '6jrN28fS9Nu167aeEdrB6L'

export default async function handler(req, res) {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      return res.status(500).json({ error: 'Missing Spotify credentials' })
    }

    // Step 1 — Get access token
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    })

    const tokenData = await tokenRes.json()

    if (!tokenData.access_token) {
      return res.status(401).json({ error: 'Failed to get Spotify token' })
    }

    const headers = { Authorization: `Bearer ${tokenData.access_token}` }

    // Step 2 — Fetch latest release + top tracks in parallel
    const [releasesRes, topTracksRes] = await Promise.all([
      fetch(`https://api.spotify.com/v1/artists/${ARTIST_ID}/albums?include_groups=album,single&limit=1&market=CA`, { headers }),
      fetch(`https://api.spotify.com/v1/artists/${ARTIST_ID}/top-tracks?market=CA`, { headers }),
    ])

    const [releasesData, topTracksData] = await Promise.all([
      releasesRes.json(),
      topTracksRes.json(),
    ])

    // Latest release
    const latest = releasesData.items?.[0] ? {
      id: releasesData.items[0].id,
      title: releasesData.items[0].name,
      year: releasesData.items[0].release_date?.split('-')[0] ?? '',
      type: releasesData.items[0].album_type === 'single' ? 'Single' : 'Album',
      coverUrl: releasesData.items[0].images?.[0]?.url ?? null,
      spotifyUrl: releasesData.items[0].external_urls?.spotify ?? '#',
    } : null

    // Top 5 tracks
    const topTracks = (topTracksData.tracks ?? []).slice(0, 5).map(track => ({
      id: track.id,
      title: track.name,
      album: track.album?.name ?? '',
      coverUrl: track.album?.images?.[0]?.url ?? null,
      spotifyUrl: track.external_urls?.spotify ?? '#',
      durationMs: track.duration_ms,
    }))

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    res.status(200).json({ latest, topTracks })

  } catch (err) {
    console.error('Spotify API error:', err)
    res.status(500).json({ error: 'Failed to fetch releases' })
  }
}
