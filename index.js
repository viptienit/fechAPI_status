const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(express.json());

class Status {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdBy = "MCB003";
    this.updatedBy = "MCB003";
    this.updatedAt = "10-10-2024";
    this.createdAt = "10-10-2024";
    this.isDefault = false;
  }
}

const data = () => {
  return JSON.parse(fs.readFileSync("./data.json", "utf-8"));
};

app.get("/status", (req, res) => {
  res.json({
    status: true,
    mesage: "Lấy danh sách trạng thái thành công",
    data: data(),
  });
});
app.post("/status", (req, res) => {
  const { name, description } = req.body;
  const id = data()[data().length - 1].id + 1;
  const status = new Status(id, name, description);

  const list = data();
  list.push(status);
  fs.writeFileSync("./data.json", JSON.stringify(list, null, 2));
  res.json({
    status: true,
    mesage: "Thêm trạng thái thành công",
    data: null,
  });
});

app.put("/status/:id", (req, res) => {
  const { name, description } = req.body;
  const id = +req.params.id;
  const status = new Status(id, name, description);
  const list = data();
  list[list.findIndex((item) => item.id == id)] = status;
  fs.writeFileSync("./data.json", JSON.stringify(list, null, 2));
  res.json({
    status: true,
    mesage: "Sửa trạng thái thành công",
    data: null,
  });
});

app.delete("/status/:id", (req, res) => {
  const id = +req.params.id;
  const list = data().filter((e) => e.id != id);
  fs.writeFileSync("./data.json", JSON.stringify(list, null, 2), (err) => {
    console.log(err);
  });
  res.json({
    status: true,
    mesage: "Xóa thái thành công",
    data: null,
  });
});

app.listen(5000);
