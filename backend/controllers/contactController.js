import User from "../models/userModel.js";
import Contact from "../models/contactModel.js";

const sendMessage = async (req, res) => {
      try {
            const { message } = req.body;
            const userId = req.userId;

            if (!message) {
                  res.status(400).json({ message: "No message from you" });
            }
            const newMessage = new Contact({
                  userId,
                  message,
            });

            await newMessage.save();
            res.status(200).json({ message: "Message sent successfully!", message });
      } catch (error) {
            res.status(500).json({ message: "Server error when sending a message" });
      }
};

// Only an admin can get all messages
const getAllMessages = async (req, res) => {
      try {
            const messages = await Contact.find();
            if (!messages) {
                  res.status(200).json({ message: "No message Found" });
            }
            res.json(200).json({ messages });
      } catch (error) {
            res.status(500).json({ message: "Server error when getting all messages" });
      }
};

const updateMessage = async (req, res) => {
      const messageId = req.params.messageId;
      const { message } = req.body;
      try {
            const existingMessage = await Contact.findById({ messageId });

            if (!msg) {
                  res.status(400).json({ message: "Message does not exist!" });
            }

            existingMessage.message = message || existingMessage.message;
            await Contact.save();
            res.status(201).json({ message: "Message updated successfully!" });
      } catch (error) {
            res.status(500).json({ message: "Server error when updating message" });
      }
};

const deleteMessage = async (req, res) => {
      const messageId = req.params.messageId;
      const message = await Contact.findById({ messageId });
      if (!message) {
            res.status(401).json({ message: `No message with {messageId} was found` });
      }
      await Contact.remove();
      res.json(200).json({ message: "Message deleted successfully!" });
};

export { sendMessage, getAllMessages, deleteMessage, updateMessage };
