userSocketMap : Object có key userId = socketId

io.emit("getOnlineUsers", Object.keys(userSocketMap)) 
=> Trả về tất cả userId có trong userSocketMap, nghĩa là trả về tất cả người dùng có online

const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
}; => Trả về socketId của người dùng có online 

Gọi socket bên phía client cài đặt query với tham số userId
const socket = io("https://chat-app-yt.onrender.com", {
	query: {
		userId: authUser._id,
	},
});

Nhận giá trị userId bên phía server trong hàm io.on
const userId = socket.handshake.query.userId;


Có 2 Model :
+ Message : senderId, receiverId, message
+ Conversation : participants [senderId, receiverId], messages [ messageId ]

Phương thức Send Message:
+ Tìm trong Conversation theo [senderId, receiverId], nếu chưa có thì tạo
+ Sau đó lấy message từ req.body 
+ Lưu vào message_Model, Conversation_Model
+ Kiểm tra người đó có online hay không, 
    - Nếu online thì gửi tới receiverSocketId message với key newMessage
    - Không online thì trả về client thông qua respone message

const receiverSocketId = getReceiverSocketId(receiverId);
if (receiverSocketId) {
	io.to(receiverSocketId).emit("newMessage", newMessage);
}

Phương thức Get Messages:
+ Tìm trong Conversation theo [senderId, receiverId], nếu chưa có trả về client null
+ Trả về client Coversation




-----------------------------------------------------------------------------
