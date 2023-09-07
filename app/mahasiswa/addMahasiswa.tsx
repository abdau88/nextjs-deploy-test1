"use client";
import { useState, SyntheticEvent } from "react";
import type { Prodi } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddMahasiswa = ({ prodis }: { prodis: Prodi[] }) => {
  const [npm, setNpm] = useState("");
  const [nama, setNama] = useState("");
  const [prodi, setProdi] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("/api/mahasiswa", {
      npm: npm,
      nama: nama,
      prodiId: Number(prodi),
    });
    setNpm("");
    setNama("");
    setProdi("");
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button className="btn" onClick={handleModal}>
        Add New
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Mahasiswa</h3>
          <form onSubmit={handleSubmit}>
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
                onChange={(e) => setProdi(e.target.value)}
                className="select select-bordered"
              >
                <option value="" disabled>
                  Pilih Program Studi
                </option>
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
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMahasiswa;
