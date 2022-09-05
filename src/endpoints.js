export const fetchSearchNfts = (value, city) => `https://fyxedsearch.herokuapp.com/posts/searchfyxed/${value}/${city}`
export const fetchFilterStad = (value, city) => `https://fyxedsearch.herokuapp.com/posts/sortstad/${value}/${city}`

export const fetchAllNfts = (value) => "https://fyxedsearch.herokuapp.com/posts/companies"
export const filterNfts = (value) => `https://niftynotify.herokuapp.com/posts/collectiequery/${value}`
export const nftNotification = (id) => `https://niftynotify.herokuapp.com/posts/usersettings/${id}`
export const editNftNotification = (value, id) => `https://niftynotify.herokuapp.com/posts/updatepost/${value}/${id}`
export const deleteNftNotification = (id) => `https://niftynotify.herokuapp.com/posts/${id}`
export const SendPushToken = (id) => `https://fyxedsearch.herokuapp.com/posts/pushtokens/${id}`
export const Iconcheck = (id, value) => `https://fyxedsearch.herokuapp.com/posts/checkfavorite/${id}/${value}`