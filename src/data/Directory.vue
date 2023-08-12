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
      ["3½ Floppy (A:)", "FloppyDrive", "Folder", true],
      [
        "Local Disk (C:)",
        "Drive",
        "Folder",
        true,
        [
          ["My Documents", "MyDocuments", "S3Folder", true, ['MinIO', Folders.MinIO.baseURL, '']],
          ["My Pictures", "Folder", "Folder", true],
        ],
      ],
      ["SuperBoot CD-ROM (D:)", "DiskDrive", "S3Folder", true, ['MinIO', Folders.MinIO.baseURL, 'ISOs/']],
      ["Control Panel", "Folder", "Folder", true],
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
      // ["Kitten Connect", "Internet", "Internet", true, ['https://kittenconnect.net']],
    ],
  ],
  ["Recycle Bin", "RecycleBin", "Folder", true, [
    ["PinBall", "PinBall", "Internet", true, ['https://alula.github.io/SpaceCadetPinball/index.html']],
    ["Very Private WebSite", "Internet", "Internet", true, ['https://www.hamstershub.com/']],
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