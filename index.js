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
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const data = (id) => {
  return JSON.parse(fs.readFileSync(`./data${id}.json`, "utf-8"));
};

app.get("/status", (req, res) => {
  const query = req.query.idServer;
  if (!query || !arr.includes(+query)) {
    res.json({
      status: false,
      mesage: "Chưa có query, query từ 1 -> 10",
      data: data(query),
    });
  }
  res.json({
    status: true,
    mesage: "Lấy danh sách trạng thái thành công",
    data: data(query),
  });
});
app.post("/status", (req, res) => {
  const query = req.query.idServer;
  if (!query || !arr.includes(+query)) {
    res.json({
      status: false,
      mesage: "Chưa có query, query từ 1 -> 10",
      data: data(query),
    });
  }

  const { name, description } = req.body;
  const id = data(query)[data(query).length - 1].id + 1;
  const status = new Status(id, name, description);

  const list = data(query);
  list.push(status);
  fs.writeFileSync(`./data${query}.json`, JSON.stringify(list, null, 2));
  res.json({
    status: true,
    mesage: "Thêm trạng thái thành công",
    data: null,
  });
});

app.put("/status/:id", (req, res) => {
  const query = req.query.idServer;
  if (!query || !arr.includes(+query)) {
    res.json({
      status: false,
      mesage: "Chưa có query, query từ 1 -> 10",
      data: data(query),
    });
  }

  const { name, description } = req.body;
  const id = +req.params.id;
  const status = new Status(id, name, description);
  const list = data(query);
  list[list.findIndex((item) => item.id == id)] = status;
  fs.writeFileSync(`./data${query}.json`, JSON.stringify(list, null, 2));
  res.json({
    status: true,
    mesage: "Sửa trạng thái thành công",
    data: null,
  });
});

app.delete("/status/:id", (req, res) => {
  const query = req.query.idServer;
  if (!query || !arr.includes(+query)) {
    res.json({
      status: false,
      mesage: "Chưa có query, query từ 1 -> 10",
      data: data(query),
    });
  }

  const list = data(query).filter((e) => e.id != id);
  fs.writeFileSync(
    `./data${query}.json`,
    JSON.stringify(list, null, 2),
    (err) => {
      console.log(err);
    }
  );
  res.json({
    status: true,
    mesage: "Xóa thái thành công",
    data: null,
  });
});

app.listen(5000);
