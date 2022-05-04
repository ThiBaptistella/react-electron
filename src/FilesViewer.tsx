import { IconFolder, IconFile, IconFolderOpen } from './Icons'

interface Resp {
  files: [],
  onBack: () => void
  onOpen: (name: string) => void
  name: string
  directory: string
  size: number
}

export const FilesViewer = ({ files, onBack, onOpen, name, directory, size } : Resp) => (
  <table className="table" key={name}>
    <tbody>
      <tr className="clickable" onClick={onBack}>
        <td className="icon-row">
          <IconFolderOpen />
        </td>
        <td>...</td>
        <td></td>
      </tr>

      {files.map(({ name, directory, size }) => {
        return (
          <tr key={name} className="clickable" onClick={() => directory && onOpen(name)}>
            <td className="icon-row">
              {directory ? <IconFolder /> : <IconFile />}
            </td>
            <td>{name}</td>
            <td>
              <span className="float-end">{size}</span>
            </td>
          </tr>
        )
      })}
    </tbody>
  </table>
)
