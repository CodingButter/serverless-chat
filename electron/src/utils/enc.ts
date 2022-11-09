import crypto from 'crypto'

type KeyPair = {
  publicKey: string
  privateKey: string
}

export function generateKeyPair() {
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 512,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: 'top secret'
    }
  })
  return keyPair as unknown as KeyPair
}

export function signData(data: string, privateKey: string) {
  const signer = crypto.sign('SHA256', Buffer.from(data), {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING
  })
  return signer.toString('base64')
}

export function verifyDataSignature(data: string, signature: string, publicKey: string) {
  return crypto.verify(
    'SHA256',
    Buffer.from(data),
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING
    },
    Buffer.from(signature, 'base64')
  ) as unknown as boolean
}
