import { setupTypeAcquisition } from '@typescript/ata'

export default async function createATA(onDownloadFile: (code: string, path: string) => void) {
  const ata = setupTypeAcquisition({
    projectName: 'ata',
    typescript: await import('typescript'),
    logger: console,
    delegate: {
      receivedFile: (code, path) => {
        // console.log('download___', path)
        onDownloadFile(code, path)
      },
      errorMessage: (e) => {
        console.error(e)
      }
    }
  })

  return ata
}
