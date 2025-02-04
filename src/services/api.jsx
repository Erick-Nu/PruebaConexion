    import { useState, useEffect } from "react"
    import { db, collection, addDoc, getDocs } from "./firebase"
    import "./api.css"

    const TestFirestore = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Estado para los campos del formulario
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [precio, setPrecio] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [propietario, setPropietario] = useState("")

    // Función para obtener datos de Firestore
    const fetchData = async () => {
        try {
        const querySnapshot = await getDocs(collection(db, "maquetas"))
        const productosData = []
        querySnapshot.forEach((doc) => {
            productosData.push({ id: doc.id, ...doc.data() })
        })
        setData(productosData)
        setLoading(false)
        } catch (err) {
        setError("Error al obtener los datos: " + err.message)
        setLoading(false)
        }
    }

    // Función para guardar los datos en Firestore
    const saveData = async (e) => {
        e.preventDefault()
        if (nombre === "" || descripcion === "" || precio === "" || cantidad === "" || propietario === "") {
        alert("Por favor, completa todos los campos.")
        return
        }

        try {
        await addDoc(collection(db, "maquetas"), {
            nombre,
            descripcion,
            precio: Number.parseFloat(precio),
            cantidad: Number.parseInt(cantidad),
            propietario,
            fechaSubida: new Date().toISOString(),
        })
        alert("Producto guardado con éxito")
        fetchData()
        // Limpiar los campos del formulario
        setNombre("")
        setDescripcion("")
        setPrecio("")
        setCantidad("")
        setPropietario("")
        } catch (err) {
        console.error("Error al guardar el producto: ", err.message)
        }
    }

    useEffect(() => {
        fetchData()
    }, []) 

    if (loading) return <div className="loading">Cargando...</div>
    if (error) return <div className="error">{error}</div>

    return (
        <div className="container">


        <div className="form-container">
            <h3 className="form-title">Agregar nuevo producto:</h3>
            <form onSubmit={(e) => e.preventDefault()} className="product-form">
            <input
                type="text"
                placeholder="Nombre del producto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <textarea
                placeholder="Descripción del producto"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            />
            <input
                type="number"
                placeholder="Precio del producto"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
            />
            <input type="number" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
            <input
                type="text"
                placeholder="Propietario"
                value={propietario}
                onChange={(e) => setPropietario(e.target.value)}
            />
            <button onClick={saveData} className="submit-btn">
                Guardar Producto
            </button>
            </form>
        </div>

        <h2 className="title">Datos de Firestore:</h2>
        <ul className="product-list">
            {data.map((producto) => (
            <li key={producto.id} className="product-item">
                <h3>{producto.nombre}</h3>
                <p>
                <strong>Precio:</strong> ${producto.precio}
                </p>
                <p>
                <strong>Cantidad:</strong> {producto.cantidad}
                </p>
                <p>
                <strong>Propietario:</strong> {producto.propietario}
                </p>
                <p>
                <strong>Fecha:</strong> {new Date(producto.fechaSubida).toLocaleString()}
                </p>
            </li>
            ))}
        </ul>

        </div>
    )
    }

    export default TestFirestore

