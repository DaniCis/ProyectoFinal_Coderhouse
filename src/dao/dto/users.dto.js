export default class usersDto {
    constructor(user) {
        this.name = `${user.first_name} ${user.last_name}`,
        this.email =  user.email,
        this.role =  user.role,
        this.id =  user._id,
        this.cart = user.cart
    }
}