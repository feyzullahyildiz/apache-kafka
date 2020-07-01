const { Kafka } = require("kafkajs");
require('./configloader');
createConsumer();

async function createConsumer() {
  try {
    const kafka = new Kafka({
      clientId: "kafka_pub_sub_client",
      brokers: [`${process.env.BROKER_HOST_NAME}:9092`]
    });

    const consumer = kafka.consumer({
      groupId: "hd_4k_8k_encoder_consumer_group"
    });

    console.log("Consumer'a bağlanılıyor..");
    await consumer.connect();
    console.log("Bağlantı başarılı.");

    // Consumer Subscribe..
    await consumer.subscribe({
      topic: "raw_video_topic",
      fromBeginning: true
    });

    await consumer.run({
      eachMessage: async result => {
        console.log(`İşlenen Video ${result.message.value}_4k_8k_encoder`);
      }
    });
  } catch (error) {
    console.log("Bir Hata Oluştu", error);
  }
}
