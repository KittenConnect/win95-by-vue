<script>
// import S3Directory from "./S3Directory.vue";

import { Folders } from "../data/S3Directory.vue";

export default [
  [
    "My Computer",
    "MyComputer",
    "Folder",
    true,
    [
      ["3½ Magic Floppy (A:)", "FloppyDrive", "S3Folder", true, ['MinIO', Folders.MinIO.baseURL, 'iPXE/']],
      [
        "Local Disk (C:)",
        "Drive",
        "Folder",
        true,
        [
          ["My Documents", "MyDocuments", "S3Folder", true, ['MinIO', Folders.MinIO.baseURL, 'SRCs/']],
          ["My Pictures", "Folder", "S3Folder", true, ['MinIO', Folders.MinIO.baseURL, 'IMGs/']],
        ],
      ],
      ["SuperBoot CD-ROM (D:)", "DiskDrive", "S3Folder", true, ['MinIO', Folders.MinIO.baseURL, 'ISOs/']],
      // ["Control Panel", "Folder", "Folder", true],
    ],
  ],
  ["Internet", "Internet", "Internet", true],
  ["Notepad", "Notepad", "Notepad", true],
  ["Paint", "Paint", "Paint", true],
  [
    "Programs",
    "Programs",
    "Folder",
    true,
    [
      ["Internet", "Internet", "Internet", true],
      ["Notepad", "Notepad", "Notepad", true],
      ["AOL", "AOL", "AOL", true],
      ["Paint", "Paint", "Paint", true],
      // ["MS-DOS Prompt", "Command", "Command", true, ['C', ['MinIO', Folders.MinIO.baseURL, '']]],
      // ["Kitten Connect", "Internet", "Internet", true, ['https://kittenconnect.net']],
      // ["Discord", "Discord", "OpenURL", true, ['https://discord.gg/v9DCcBkTfW']],
    ],
  ],
  ["Recycle Bin", "RecycleBin", "Folder", true, [
    // ["PinBall", "PinBall", "Internet", true, ['https://alula.github.io/SpaceCadetPinball/index.html']],
    // ["PinBall", "PinBall", "PinBall", true, ['https://alula.github.io/SpaceCadetPinball/index.html']],
    ["PinBall", "PinBall", "PainBall", true, ['https://alula.github.io/SpaceCadetPinball/index.html']],
    ["StarWarz.avi", "Internet", "Internet", true, ['https://www.windows93.net/c/programs/starwars/index.html']],
    ["Very Private WebSite", "Internet", "Internet", true, ['https://www.hamstershub.com/']],
    // ["Escape", "Command", "Internet", true, ['https://onehtmlpagechallenge.com/entries/bits-rain.html']],
  ]],
  // [
  //   "Folder",
  //   "Folder",
  //   "Folder",
  //   true,
  //   [
  //     [
  //       "Games",
  //       "Folder",
  //       "Folder",
  //       true,
  //       [
  //         ["Example", "Internet", "Internet", true],
  //         ["Doom", "Doom", "Internet", true, ['https://floooh.github.io/doom-sokol/']],
  //         ["PinBall", "PinBall", "Internet", true, ['https://alula.github.io/SpaceCadetPinball/index.html#canvas']],
  //         // ["Zebi", "Programs", "Folder", true],
  //         [
  //           "Even Deeper Folder",
  //           "Folder",
  //           "Folder",
  //           true,
  //           [["Recycle Bin", "RecycleBin", "Folder", true]],
  //         ],
  //       ],
  //     ],
  //     ["Internet Link", "Internet", "Internet", true],
  //   ],
  // ],
];
</script>