const { Kafka } = require("kafkajs");

const kafka = new Kafka({ clientId: "consumer", brokers: ["localhost:9092"] });

const consumer = kafka.consumer({ groupId: "order-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "orders", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const pedido = JSON.parse(message.value.toString());

      console.log(
        `✅ Procesando pedido ${pedido.orderId} de ${pedido.user} en partición ${partition}`
      );
    },
  });
};

run();
