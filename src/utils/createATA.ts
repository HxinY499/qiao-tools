import { setupTypeAcquisition } from '@typescript/ata'
import typescriprt from 'typescript'

export default function createATA(onDownloadFile: (code: string, path: string) => void) {
  const ata = setupTypeAcquisition({
    projectName: 'ata',
    typescript: typescriprt,
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
