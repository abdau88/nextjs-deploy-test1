import { PrismaClient } from "@prisma/client";
import AddMahasiswa from "./addMahasiswa";
import DeleteMahasiswa from "./deleteMahasiswa";
import UpdateMahasiswa from "./updateMahasiswa";

const prisma = new PrismaClient();

const getMahasiswa = async () => {
  const res = await prisma.mahasiswa.findMany({
    select: {
      id: true,
      npm: true,
      nama: true,
      prodiId: true,
      prodi: true,
    },
  });
  return res;
};
const getProdi = async () => {
  const res = await prisma.prodi.findMany();
  return res;
};

const Mahasiswa = async () => {
  const [mahasiswa, prodis] = await Promise.all([getMahasiswa(), getProdi()]);
  //   console.log(mahasiswa);
  return (
    <div>
      <div className="mb-2">
        <AddMahasiswa prodis={prodis} />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>NPM</th>
            <th>Nama</th>
            <th>Prodi</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((mhs, index) => (
            <tr key={mhs.id}>
              <td>{index + 1}</td>
              <td>{mhs.npm}</td>
              <td>{mhs.nama}</td>
              <td>{mhs.prodi.program_studi}</td>
              <td className="flex justify-center space-x-2">
                <UpdateMahasiswa mhs={mhs} prodis={prodis} />
                <DeleteMahasiswa mhs={mhs} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mahasiswa;
