import PropTypes from 'prop-types'

const songShape = PropTypes.shape({
  annotation_count: PropTypes.number,
  api_path: PropTypes.string,
  artist_names: PropTypes.string,
  full_title: PropTypes.string,
  header_image_thumbnail_url: PropTypes.string,
  header_image_url: PropTypes.string,
  id: PropTypes.number,
  lyrics_owner_id: PropTypes.number,
  lyrics_state: PropTypes.string,
  path: PropTypes.string,
  primary_artist: PropTypes.shape({
    api_path: PropTypes.string,
    header_image_url: PropTypes.string,
    id: PropTypes.number,
    image_url: PropTypes.string,
    iq: PropTypes.number,
    is_meme_verified: PropTypes.bool,
    is_verified: PropTypes.bool,
    name: PropTypes.string,
    url: PropTypes.string
  }),
  pyongs_count: PropTypes.number,
  song_art_image_thumbnail_url: PropTypes.string,
  song_art_image_url: PropTypes.string,
  stats: PropTypes.shape({
    hot: PropTypes.bool,
    pageviews: PropTypes.number,
    unreviewed_annotations: PropTypes.number
  }),
  title: PropTypes.string,
  title_with_featured: PropTypes.string,
  url: PropTypes.string
})

export default songShape
