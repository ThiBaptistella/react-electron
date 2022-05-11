import { useMemo, useState } from 'react'
const fs = window.require('fs')
const pathModule = window.require('path')
const { app } = window.require('@electron/remote')

const formatSize = (size: number) => {
  var i = Math.floor(Math.log(size) / Math.log(1024))
  return (
    Number((size / Math.pow(1024, i)).toFixed(2)) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  )
}

const path = app.getAppPath()

export const CurrentPath = path

export const FileList = () => {
  const result = useMemo(
    () =>
      fs
        .readdirSync(path)
        .map((file: any) => {
          const stats = fs.statSync(pathModule.join(path, file))
          return {
            name: file,
            size: stats.isFile() ? formatSize(stats.size ?? 0) : null,
            directory: stats.isDirectory()
          }
        })
        .sort((a: { directory: any; name: string }, b: { directory: any; name: any }) => {
          if (a.directory === b.directory) {
            return a.name.localeCompare(b.name)
          }
          return a.directory ? -1 : 1
        }),
    [path]
  )
  return result
}

export const OnBack = () => {
  const i  = pathModule.dirname(path)
  return i;
};

export const OnOpen = (folder: string) => {
  const p = pathModule.join(path, folder)
  return p;
};
