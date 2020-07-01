const { Kafka } = require("kafkajs");
require('./configloader');
createTopic();

async function createTopic() {
  try {
    // Admin Stuff..
    const kafka = new Kafka({
      clientId: "kafka_pub_sub_client",
      brokers: [`${process.env.BROKER_HOST_NAME}:9092`]
    });

    const admin = kafka.admin();
    console.log("Kafka Broker'a bağlanılıyor...");
    await admin.connect();
    console.log("Kafka Broker'a bağlantı başarılı, Topic üretilecek..");
    await admin.createTopics({
      topics: [
        {
          topic: "raw_video_topic",
          numPartitions: 1
        }
      ]
    });
    console.log("Topic Başarılı bir şekilde oluşturulmuştur...");
    await admin.disconnect();
  } catch (error) {
    console.log("Bir Hata Oluştu", error);
  } finally {
    process.exit(0);
  }
}
