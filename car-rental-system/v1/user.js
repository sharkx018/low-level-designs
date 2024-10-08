class User{
    constructor(userId, name, email, phone, password, role = 'customer') {
        this.userId = userId
        this.name = name
        this.phone = phone
        this.password = password
        this.role = role
        this.bookings = []
    }

    register(userList){
        userList.push(this);
    }

    login(userList, email, password){
        const user = userList.find(user=> user.email === email && user.password === password)
        return user || null
    }

    updateProfile(details){
        if(details.name) this.name = details.name
        if(details.phone) this.name = details.phone
        if(details.password) this.name = details.password
    }

    getBookings(){
        return this.bookings
    }

}

module.exports = User
