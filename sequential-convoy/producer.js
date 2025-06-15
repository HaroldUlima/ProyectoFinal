const { Kafka } = require("kafkajs");

const kafka = new Kafka({ clientId: "producer", brokers: ["localhost:9092"] });
const producer = kafka.producer();

const sendOrders = async () => {
  await producer.connect();

  const users = ["user1", "user2", "user3"];

  for (let i = 0; i < 10; i++) {
    const user = users[i % users.length];
    const order = {
      orderId: `order-${i}`,
      user,
      timestamp: new Date().toISOString(),
    };

    await producer.send({
      topic: "orders",
      messages: [
        {
          key: user,
          value: JSON.stringify(order),
        },
      ],
    });

    console.log(`📦 Enviado pedido: ${JSON.stringify(order)}`);
  }

  await producer.disconnect();
};

sendOrders();
