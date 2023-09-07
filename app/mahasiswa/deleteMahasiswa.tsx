"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import axios from "axios";

type Mahasiswa = {
  id: number;
  npm: string;
  nama: string;
  prodiId: number;
};

const DeleteMahasiswa = ({ mhs }: { mhs: Mahasiswa }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async (mhsId: number) => {
    await axios.delete(`/api/mahasiswa/${mhsId}`);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={handleModal}>
        Hapus
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Apakah Anda yakin menghapus {mhs.nama}?
          </h3>

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              Tidak
            </button>
            <button
              type="button"
              onClick={() => handleDelete(mhs.id)}
              className="btn btn-primary"
            >
              Ya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteMahasiswa;
