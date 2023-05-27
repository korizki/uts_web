const {useState, useEffect} = React
const App = () => {
    const [activeTab, setActiveTab] = useState(1)
    const [listMahasiswa, setListMahasiswa] = useState([])
    const [listMataKuliah, setListMataKuliah] = useState([])
    const [listDosen, setListDosen] = useState([])
    const getData = param => {
        $.ajax({
            url: `process/getData.php?type=${param}`,
            method: 'GET',
            success: data => {
                if(param == 'mahasiswa'){
                    setListMahasiswa(JSON.parse(data))
                } else if(param == 'matakuliah'){
                    setListMataKuliah(JSON.parse(data))
                } else if(param == 'dosen'){
                    setListDosen(JSON.parse(data))
                }
            }
        })
    }
    const handleSubmit = (e, param) => {
        e.preventDefault()
        let formData = new FormData(document.querySelector(`#t${param}`))
        let url = ''
        formData = Object.fromEntries(formData.entries())
        if(param == 'mahasiswa'){
            const {Nama, NIM, Program_Studi} = formData
            url = `process/processAdd.php?type=${param}&Nama=${Nama}&NIM=${NIM}&Program_Studi=${Program_Studi}` 
        } else if (param == 'matakuliah'){
            const {Nama, Kode_Matakuliah, Deskripsi} = formData
            url = `process/processAdd.php?type=${param}&nama=${Nama}&kode=${Kode_Matakuliah}&deskripsi=${Deskripsi}` 
        } else if (param == 'dosen'){
            const {Nama, NIDN, Jenjang_Pendidikan} = formData
            url = `process/processAdd.php?type=${param}&nama=${Nama}&nidn=${NIDN}&jenjang=${Jenjang_Pendidikan}` 
        }
        $.ajax({
            url,
            method: 'POST',
            processData: false,
            contentType: false,
            success: data => {
                if(data == 'berhasil'){
                    $(`#t${param}`)[0].reset()
                    getData(param)
                }
            }
        })
    }
    useEffect(() => {
        if(activeTab == 1){
            getData('mahasiswa')
        } else if(activeTab == 2){
            getData('matakuliah')
        } else if(activeTab == 3){
            getData('dosen')
        }
    }, [activeTab])
    return (
        <div>
            <div className="p-1 flex justify-around bg-slate-50 border border-t-slate-200">
                <a 
                    className={`text-slate-400 cursor-pointer py-2 px-4  ${activeTab == 1 ? 'bg-sky-500 text-white rounded-md': ''}`}
                    onClick={() => setActiveTab(1)}
                    >Mahasiswa</a>
                <a 
                    className={`text-slate-400 cursor-pointer py-2 px-4  ${activeTab == 2 ? 'bg-sky-500 text-white rounded-md': ''}`}
                    onClick={() => setActiveTab(2)}
                    >Mata Kuliah</a>
                <a
                    className={`text-slate-400 cursor-pointer py-2 px-4  ${activeTab == 3 ? 'bg-sky-500 text-white rounded-md': ''}`} 
                    onClick={() => setActiveTab(3)}
                >Dosen</a>
            </div>
            {
                activeTab == 1 ? (
                    <div className="flex">
                        <form id="tmahasiswa" className="w-[100%] px-[3%] py-[2%] flex-1" onSubmit={e => handleSubmit(e, 'mahasiswa')}>
                            <div className="mb-4">
                                <label className="block">Nama</label>
                                <input required type="text" placeholder="Masukkan nama Mahasiswa" name="Nama" className="border border-slate-200 p-2 mt-1 w-[100%] rounded-md"/>
                            </div>
                            <div className="mb-4">
                                <label className="block">NIM</label>
                                <input required type="text" placeholder="Masukkan NIM" name="NIM" className="border border-slate-200 p-2 mt-1 w-[100%] rounded-md"/>
                            </div>
                            <div className="mb-4">
                                <label className="block">Program Studi</label>
                                <input required  type="text" placeholder="Masukkan nama Program Studi" name="Program_Studi" className="border border-slate-200 p-2 mt-1 w-[100%] rounded-md"/>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="p-2 px-5 bg-sky-500 text-white rounded-md hover:bg-sky-700">Simpan</button>
                            </div>
                        </form>
                        <div className="flex-2 px-[2%] py-[2%]">
                            <h1 className="text-xl font-semibold">Daftar Mahasiswa</h1>
                            {
                                listMahasiswa.length ? (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Nama Mahasiswa</th>
                                                <th>NIM</th>
                                                <th>Program Studi</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listMahasiswa.map((it, index) => (
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{it.Nama}</td>
                                                    <td>{it.NIM}</td>
                                                    <td>{it.Program_Studi}</td>
                                                    <td>
                                                        <i 
                                                            className="fa-solid fa-trash text-rose-400 cursor-pointer mr-4"
                                                            title="Hapus mahasiswa"
                                                            onClick={() => handleDelete('mahasiswa', it.ID)}
                                                            ></i> 
                                                        <i 
                                                            title="Update mahasiswa"
                                                            onClick={() => handleUpdate('mahasiswa', it.ID)}
                                                            className="fa-solid fa-square-pen text-emerald-400 text-lg cursor-pointer">
                                                        </i> 
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (<h2 className="text-rose-500 text-center text-semibold py-5">Data mahasiswa tidak tersedia.</h2>)
                            }
                        </div>
                    </div>
                ) : false
            }
            {
                activeTab == 2 ? (
                    <div className="flex">
                        <form id="tmatakuliah" className="w-[100%] px-[3%] py-[2%] flex-1" onSubmit={e => handleSubmit(e, 'matakuliah')}>
                            <div className="mb-4">
                                <label className="block">Nama Mata Kuliah</label>
                                <input required  type="text" placeholder="Masukkan nama mata kuliah" name="Nama" className="border border-slate-200 p-2 mt-1 w-[100%] rounded-md"/>
                            </div>
                            <div className="mb-4">
                                <label className="block">Kode Mata Kuliah</label>
                                <input required  type="text" placeholder="Masukkan kode mata kuliah" name="Kode_Matakuliah" className="border border-slate-200 p-2 mt-1 w-[100%] rounded-md"/>
                            </div>
                            <div className="mb-4">
                                <label className="block">Deskripsi</label>
                                <input required  type="text" placeholder="Masukkan deskripsi mata kuliah" name="Deskripsi" className="border border-slate-200 p-2 mt-1 w-[100%] rounded-md"/>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="p-2 px-5 bg-sky-500 text-white rounded-md hover:bg-sky-700">Simpan</button>
                            </div>
                        </form>
                        <div className="flex-2 px-[2%] py-[2%]">
                            <h1 className="text-xl font-semibold">Daftar Mata Kuliah</h1>
                            {
                                listMataKuliah.length ? (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Nama Mata Kuliah</th>
                                                <th>Kode</th>
                                                <th>Deskripsi</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listMataKuliah.map((it, index) => (
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{it.Nama}</td>
                                                    <td>{it.Kode_Matakuliah}</td>
                                                    <td>{it.Deskripsi}</td>
                                                    <td>
                                                        <i 
                                                            className="fa-solid fa-trash text-rose-400 cursor-pointer mr-4"
                                                            title="Hapus mahasiswa"
                                                            onClick={() => handleDelete('mahasiswa', it.ID)}
                                                            ></i> 
                                                        <i 
                                                            title="Update mahasiswa"
                                                            onClick={() => handleUpdate('mahasiswa', it.ID)}
                                                            className="fa-solid fa-square-pen text-emerald-400 text-lg cursor-pointer">
                                                        </i> 
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (<h2 className="text-rose-500 text-center text-semibold py-5">Data Mata Kuliah tidak tersedia.</h2>)
                            }
                        </div>
                    </div>
                ) : false
            }
            {
                activeTab == 3 ? (
                    <div className="flex">
                        <form id="tdosen" className="w-[100%] px-[3%] py-[2%] flex-1" onSubmit={e => handleSubmit(e, 'dosen')}>
                            <div className="mb-4">
                                <label className="block">Nama Dosen</label>
                                <input required  type="text" placeholder="Masukkan nama dosen" name="Nama" className="border border-slate-200 p-2 mt-1 w-[100%] rounded-md"/>
                            </div>
                            <div className="mb-4">
                                <label className="block">Nomor Induk Dosen</label>
                                <input required  type="text" placeholder="Masukkan NIDN" name="NIDN" className="border border-slate-200 p-2 mt-1 w-[100%] rounded-md"/>
                            </div>
                            <div className="mb-4">
                                <label className="block">Jenjang Pendidikan</label>
                                <select required  name="Jenjang_Pendidikan" className="border border-slate-200 p-2 mt-1 w-[100%] rounded-md">
                                    <option value="">Pilih Pendidikan Dosen</option>
                                    <option value="S2">S2</option>
                                    <option value="S3">S3</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="p-2 px-5 bg-sky-500 text-white rounded-md hover:bg-sky-700">Simpan</button>
                            </div>
                        </form>
                        <div className="flex-2 px-[2%] py-[2%]">
                            <h1 className="text-xl font-semibold">Daftar Dosen</h1>
                            {
                                listDosen.length ? (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Nama Dosen</th>
                                                <th>NIDN</th>
                                                <th>Jenjang Pendidikan</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listDosen.map((it, index) => (
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{it.Nama}</td>
                                                    <td>{it.NIDN}</td>
                                                    <td>{it.Jenjang_Pendidikan}</td>
                                                    <td>
                                                        <i 
                                                            className="fa-solid fa-trash text-rose-400 cursor-pointer mr-4"
                                                            title="Hapus mahasiswa"
                                                            onClick={() => handleDelete('mahasiswa', it.ID)}
                                                            ></i> 
                                                        <i 
                                                            title="Update mahasiswa"
                                                            onClick={() => handleUpdate('mahasiswa', it.ID)}
                                                            className="fa-solid fa-square-pen text-emerald-400 text-lg cursor-pointer">
                                                        </i> 
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (<h2 className="text-rose-500 text-center text-semibold py-5">Data Dosen tidak tersedia.</h2>)
                            }
                        </div>
                    </div>
                ) : false
            }
        </div>
    )
}

const root = document.querySelector('#app')
const el = ReactDOM.createRoot(root)
el.render(<App />)