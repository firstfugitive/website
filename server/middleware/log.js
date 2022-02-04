export default (req, res, next) => {
    console.log('Rendering', req.url)
    next()
}