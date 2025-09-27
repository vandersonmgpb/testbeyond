// Função para gerar um ULID dinâmico
export function generateULID() {
  const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford's Base32
  const TIME_LEN = 10;
  const RANDOM_LEN = 16;

  // Gera os 48 bits de timestamp
  const time = Date.now();
  const timeChars = [];
  let value = time;

  for (let i = TIME_LEN - 1; i >= 0; i--) {
    timeChars[i] = ENCODING[value % 32];
    value = Math.floor(value / 32);
  }

  // Gera os 80 bits de entropia aleatória
  const randomChars = [];
  for (let i = 0; i < RANDOM_LEN; i++) {
    const rand = Math.floor(Math.random() * 32);
    randomChars[i] = ENCODING[rand];
  }

  return timeChars.join('') + randomChars.join('');
}

// Exemplo de uso
console.log(generateULID());
