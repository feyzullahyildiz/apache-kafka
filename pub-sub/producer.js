const { Kafka } = require("kafkajs");
require('./configloader');
createProducer();

async function createProducer() {
  try {
    const kafka = new Kafka({
      clientId: "kafka_pub_sub_client",
      brokers: [`${process.env.BROKER_HOST_NAME}:9092`]
    });

    const producer = kafka.producer();
    console.log("Producer'a bağlanılıyor..");
    await producer.connect();
    console.log("Bağlantı başarılı.");
    const message_result = await producer.send({
      topic: "raw_video_topic",
      messages: [
        {
          value: "Yeni Video İçeriği",
          partition: 0
        }
      ]
    });
    console.log("Gonderim işlemi başarılıdır", JSON.stringify(message_result));
    await producer.disconnect();
  } catch (error) {
    console.log("Bir Hata Oluştu", error);
  } finally {
    process.exit(0);
  }
}
