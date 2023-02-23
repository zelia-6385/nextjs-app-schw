import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
    }

    const newMessage = {
      email,
      name,
      message,
    };

    const url = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.dywv57d.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(url);

    try {
      await client.connect();
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database!" });
      return;
    }

    const dbName = process.env.mongodb_database;
    const db = client.db(dbName);

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      res.status(500).json({ message: "Storing message failed!" });
      return;
    }

    client?.close();

    res
      .status(201)
      .json({ message: "Successfully stored message!", newMessage });
  }
}

export default handler;
