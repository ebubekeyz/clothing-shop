const createTokenUser = (user) => {
    return {name: user.name, email: user.email, state: user.state, country: user.country, street: user.street, phone: user.phone, userId: user._id, role: user.role}
}

module.exports = createTokenUser