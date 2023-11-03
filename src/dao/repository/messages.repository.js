export default class MessagesRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getMessages = () => {
        let result = this.dao.getMessages()
        return result;
    }

    createMessage = (newMessage) => {
        let result = this.dao.createMessage(newMessage);
        return result;
    }
}