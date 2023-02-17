const Dockerode = require("dockerode");
const dockerode = new Dockerode();
const extensions = require("./extensions");

exports.spawnSibling = async (lang) => {
  try {
    const image_path = `./images/${lang}/`;
    const image_tag = "rce-spawner:latest";
    const container_name = "mycontainer";
    const file1 = `code.${extensions[data.lang]}`;
    const file2 = "input.txt";
    const file3 = "script.sh";
    await dockerode.buildImage(
      { context: image_path, src: ["Dockerfile", file1, file2, file3] },
      { t: image_tag }
    );
    console.log("Image built");

    dockerode.createContainer({
      Image: image_tag,
    });
  } catch (e) {
    console.log(e.message);
  }
};
