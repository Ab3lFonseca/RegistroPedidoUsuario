import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";

export default function App() {
  const [pedidos, setPedidos] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("sucesso"); 

  const API_URL = "http://localhost:3000"; 

  //  Formatar data
  const formatarData = (dataISO) => {
    if (!dataISO) return "";
  
    const data = new Date(String(dataISO).replace(" ", "T"));
    if (isNaN(data.getTime())) return "Data inválida";

    return data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // Buscar pedidos
  const carregarPedidos = () => {
    axios
      .get(`${API_URL}/pedidos`)
      .then((res) => {
        setPedidos(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  const mostrarMensagem = (texto, tipo = "sucesso") => {
    setMensagem(texto);
    setTipoMensagem(tipo);
    setTimeout(() => setMensagem(""), 3000);
  };

  //  Cadastrar Cliente + Pedido
  const cadastrarTudo = async () => {
    if (!nome || !email || !descricao || !valor) {
      mostrarMensagem("Preencha todos os campos!", "erro");
      return;
    }

    try {
      const clienteRes = await axios.post(`${API_URL}/clientes`, {
        nome,
        email,
      });
      const clienteId = clienteRes.data.id;

      await axios.post(`${API_URL}/pedidos`, {
        cliente_id: clienteId,
        descricao,
        valor: parseFloat(valor),
      });

      mostrarMensagem("✅ Cliente e Pedido cadastrados com sucesso!", "sucesso");

      setNome("");
      setEmail("");
      setDescricao("");
      setValor("");
      carregarPedidos();
    } catch (err) {
      console.log("Erro:", err.response?.data || err.message);
      if (err.response?.status === 400) {
        mostrarMensagem(err.response.data.message, "erro");
      } else {
        mostrarMensagem("Erro ao cadastrar!", "erro");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        style={{ flex: 1, width: "100%", padding: 20 }}
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={{ alignItems: "center" }}>
            <Text style={styles.titulo}>📋 Cadastro de Cliente + Pedido</Text>

            {mensagem ? (
              <View
                style={[
                  styles.mensagemBox,
                  tipoMensagem === "sucesso"
                    ? styles.mensagemSucesso
                    : styles.mensagemErro,
                ]}
              >
                <Text style={styles.mensagemTexto}>{mensagem}</Text>
              </View>
            ) : null}

            <TextInput
              style={styles.input}
              placeholder="Nome do Cliente"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.input}
              placeholder="Email do Cliente"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Descrição do Pedido"
              value={descricao}
              onChangeText={setDescricao}
            />
            <TextInput
              style={styles.input}
              placeholder="Valor do Pedido"
              value={valor}
              onChangeText={setValor}
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.botao} onPress={cadastrarTudo}>
              <Text style={styles.botaoTexto}>Cadastrar</Text>
            </TouchableOpacity>

            <Text style={styles.subtitulo}>📦 Pedidos Registrados</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cardRow}>
            <View style={styles.cardLeft}>
              <Text style={styles.textoCliente}>
                {item.nome} ({item.email})
              </Text>
              <Text style={styles.textoPedido}>Pedido: {item.descricao}</Text>
              <Text style={styles.textoValor}>
                💲 R${Number(item.valor).toFixed(2)}
              </Text>
            </View>
            <View style={styles.cardRight}>
              <Text style={styles.textoData}>
                {formatarData(item.data_cadastro || item.created_at)}
              </Text>
            </View>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 10,
    color: "#444",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  botao: {
    width: "100%",
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cardRow: {
    backgroundColor: "#fff",
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLeft: {
    flex: 1,
    paddingRight: 10,
  },
  cardRight: {
    width: 140,
    alignItems: "flex-end",
  },
  textoCliente: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  textoPedido: { fontSize: 15, color: "#555" },
  textoValor: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 5,
    color: "#1E88E5",
  },
  textoData: {
    fontSize: 13,
    color: "#888",
    textAlign: "right",
  },
  mensagemBox: {
    width: "100%",
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
  },
  mensagemSucesso: {
    backgroundColor: "#d4edda",
    borderColor: "#155724",
    borderWidth: 1,
  },
  mensagemErro: {
    backgroundColor: "#f8d7da",
    borderColor: "#721c24",
    borderWidth: 1,
  },
  mensagemTexto: {
    fontSize: 15,
    textAlign: "center",
    color: "#333",
  },
});
