"use client";
import { useState, SyntheticEvent } from "react";
import type { Prodi } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

type Mahasiswa = {
  id: number;
  npm: string;
  nama: string;
  prodiId: number;
};

const UpdateMahasiswa = ({
  mhs,
  prodis,
}: {
  prodis: Prodi[];
  mhs: Mahasiswa;
}) => {
  const [npm, setNpm] = useState(mhs.npm);
  const [nama, setNama] = useState(mhs.nama);
  const [prodi, setProdi] = useState(mhs.prodiId);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.patch(`/api/mahasiswa/${mhs.id}`, {
      nama: nama,
      prodiId: Number(prodi),
    });
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleModal}>
        Edit
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {mhs.nama}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold">NPM</label>
              <input
                type="text"
                value={npm}
                onChange={(e) => setNpm(e.target.value)}
                className="input input-bordered"
                placeholder="NPM"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Nama Mahasiswa</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="input input-bordered"
                placeholder="Nama Mahasiswa"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Program Studi</label>
              <select
                value={prodi}
                onChange={(e) => setProdi(Number(e.target.value))}
                className="select select-bordered"
              >
                {prodis.map((prodi) => (
                  <option value={prodi.id} key={prodi.id}>
                    {prodi.program_studi}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMahasiswa;
