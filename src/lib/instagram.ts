// Instagram Graph API wrapper

export interface InstagramMedia {
  id: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  mediaUrl: string;
  caption: string;
  timestamp: string;
  likeCount: number;
  commentsCount: number;
  permalink: string;
}

export async function getRecentMedia(accessToken: string, limit = 25): Promise<InstagramMedia[]> {
  const url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption,timestamp,like_count,comments_count,permalink&limit=${limit}&access_token=${accessToken}`;
  const response = await fetch(url);
  const data = await response.json();
  return (data.data || []).map((item: Record<string, unknown>) => ({
    id: item.id,
    mediaType: item.media_type,
    mediaUrl: item.media_url,
    caption: item.caption || '',
    timestamp: item.timestamp,
    likeCount: item.like_count || 0,
    commentsCount: item.comments_count || 0,
    permalink: item.permalink,
  }));
}

export async function getMediaInsights(mediaId: string, accessToken: string) {
  const url = `https://graph.instagram.com/${mediaId}/insights?metric=engagement,impressions,reach,saved,shares&access_token=${accessToken}`;
  const response = await fetch(url);
  return response.json();
}
