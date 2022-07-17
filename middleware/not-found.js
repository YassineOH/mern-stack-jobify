const notFoundMiddleware = (req, res) => {
    res.status(400).send("route does not exist")
}

export default notFoundMiddleware