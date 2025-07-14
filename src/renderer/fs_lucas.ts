import fs from "fs";

let path = "C:\\";

try {
  const files = await fs.promises.readdir(path, {
    withFileTypes: true,
  });

  for (const file of files) {
    console.log(file);
  }
} catch (err) {
  console.error(err);
}
