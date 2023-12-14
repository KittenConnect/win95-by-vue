<script>

export const Folders = {
  MinIO: { prettyName: 'Min.IO', baseURL: 'https://public.s3.svc.kittencorp.net' }
}

export const getInfos = (entry) => {
  switch (entry[2].toLocaleLowerCase()) {
    case "s3folder":
      return [entry[0], '<Dir>', [entry[4][1], entry[4][2]].join('/')]
    case "internet":
    case "notepad":
      return [entry[0], entry[1], entry[4]]
    default:
      return entry
    // return undefined
  }
}

export const fetchS3 = (server, path = '/') => {
  const serverIndex = server.baseURL
  if (!path.endsWith('/')) path = path + '/'
  if (path.startsWith('/')) path = path.replace('/', '')
  console.log(`S3 Path: ${path}`);

  // let rootContent = []

  return fetch(`${serverIndex}/?prefix=${path}&delimiter=/`)
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(data => {
      let directoryContents = [];
      console.log(data)

      // Get all <contents> tags
      let folders = data.getElementsByTagName('CommonPrefixes')
      let contents = data.getElementsByTagName('Contents')

      // Loop through all <folders> tags
      for (let i = 0; i < folders.length; i++) {
        let currentElement = folders[i]

        let elementPath = currentElement.getElementsByTagName('Prefix')[0].childNodes[0].nodeValue
        let elem = elementPath.split('/'); elem.pop()

        let elementFolder = elem.pop()

        let elementSettings = [
          `${elementFolder}`,
          "Programs",
          "S3Folder",
          true,
          [server.prettyName, server.baseURL, elementPath],
        ]

        // Add element to directoryContents
        directoryContents.push(elementSettings)
      }

      // Loop through all <contents> tags
      for (let i = 0; i < contents.length; i++) {
        let currentElement = contents[i]

        let elementPath = currentElement.getElementsByTagName('Key')[0].childNodes[0].nodeValue

        // if (!elementPath.startsWith('ISOs/')) continue

        let elementFolder = elementPath.split('/')
        let elementName = elementFolder.pop()
        let elementExt = elementName.split('.').pop().toLocaleUpperCase()

        let icon = 'Unknown'
        let type = "OpenURL"
        let data = [`${serverIndex}/${elementPath}`]

        switch (elementExt) {
          case 'ZIP':
          case 'RAR':
          case '7Z':
          case 'TAR':
          case 'GZ':
          case 'XZ':
          case 'LZMA':
            icon = 'WinZip'
            break;
          case 'ISO':
          case 'IMG':
            icon = 'DiskDrive'
            break;
          case 'TXT':
          case 'MD':
          case elementName.toLocaleUpperCase():
            icon = 'WordPad'
            type = 'notepad'
            console.log('S3 TextFile')
            console.log(data[0])
            // data = []
            break;
          case 'PDF':
            icon = 'WordPad'
            type = 'internet'
            console.log('S3 PDF-File')
            console.log(data[0])
            // data = []
            break;
          case 'PNG':
          case 'JPG':
          case 'JPEG':
            icon = 'Paint'
            type = 'internet'
            console.log('S3 ImageFile')
            console.log(data[0])
            // data = []
            break;
          case 'HTM':
          case 'HTML':
            icon = 'Internet'
            type = 'internet'
            console.log('S3 InternetLink')
            console.log(data[0])
            // data = []
            break;

          default:
            break;
        }

        let elementSettings = [
          `${elementName}`,
          icon,
          type,
          true,
          data
        ]

        // Add element to directoryContents
        directoryContents.push(elementSettings)
      }
      return directoryContents
    })
    .catch(err => console.log('Error loading xml:', err))

}

export default fetchS3

export const truncate = (fullStr, strLen, separator) => {
  strLen = strLen || 40;
  let file = fullStr.split('.')
  let fileExtention = file.pop() || ''
  if (fileExtention.length > 4) {
    file.push(fileName)
    fileExtention = ''
  }
  let fileName = file.join('.') || fullStr
  // console.log(`Truncate ${fileName} [${fileName.length}] <= ${strLen} - ${fileExtention.length}`)
  if (fileName.length <= (strLen)) return fullStr;

  separator = separator || '…';

  var sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  return [fileName.substr(0, frontChars) +
    separator +
    fileName.substr(fileName.length - backChars), fileExtention].join('.');
}

</script>