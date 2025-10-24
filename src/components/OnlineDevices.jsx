
// TODOl i'd give a maual update check for all devices rather than exhauting api limits , it will rrun on first one time on app launch but then it will be refresh to manually get the statuses
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from "axios";
import { useEffect, useState } from "react";
 import { Button } from "@/components/ui/button"
import "dotenv" 
import api from "../services/api";
import dayjs from "dayjs";
import { InfoIcon } from "lucide-react";
const OnlineDevices = () => {
  const [devicesData, setDevicesData] = useState(null);
const demoDataDevices={
  devices: [
    {
      addresses: [Array],
      authorized: true,
      blocksIncomingConnections: false,
      clientVersion: '1.86.0-tef24c2d22-g804e91c9c',
      created: '2025-07-07T13:25:23Z',
      expires: '2026-01-03T13:25:23Z',
      hostname: 'akaalforge-homelab',
      id: '1121224365309571',
      isExternal: false,
      keyExpiryDisabled: false,
      lastSeen: '2025-07-29T19:08:08Z',
      machineKey: 'mkey:cdfffec8666dbdb4658c615eddf71e85ab206b5c9282a2b2ca9ce129b1ac0d47',
      name: 'akaalforge-homelab.mau-snapper.ts.net',
      nodeId: 'nxFBiSfok911CNTRL',
      nodeKey: 'nodekey:08cea762b06800133e42a8f319147cb11d1ecf28c78e30acd1337ca2878d6941',
      os: 'linux',
      tailnetLockError: '',
      tailnetLockKey: 'nlpub:a69bce65ce9c794404185011c9dd631a82b6db00795354aaf84bc5ae0b78a33c',
      updateAvailable: true,
      user: 'manmeet-ms@github'
    },
    {
      addresses: [Array],
      authorized: true,
      blocksIncomingConnections: false,
      clientVersion: '1.86.0',
      created: '2025-07-08T00:43:37Z',
      expires: '2026-01-04T00:43:37Z',
      hostname: 'akaalforge-lnx',
      id: '2868565824838548',
      isExternal: false,
      keyExpiryDisabled: false,
      lastSeen: '2025-07-29T05:31:38Z',
      machineKey: 'mkey:65d33295fe90d1139c45dd45927a4aabc2309ecdb9ba4f1219d038b1e6ad8336',
      name: 'akaalforge-lnx.mau-snapper.ts.net',
      nodeId: 'nbxvzsMBQP11CNTRL',
      nodeKey: 'nodekey:125e8e05d6b2aeca5b4559f430bc890793477ed74955f9509a20e1197489933b',
      os: 'linux',
      tailnetLockError: '',
      tailnetLockKey: 'nlpub:53fda79db2bb2a57728abf52c9919a59851d3816633ef76749392e5f83a768d9',
      updateAvailable: true,
      user: 'manmeet-ms@github'
    },
    {
      addresses: [Array],
      authorized: true,
      blocksIncomingConnections: false,
      clientVersion: '1.84.2-t5d271bebf-gfb9977414',
      created: '2025-07-06T05:52:08Z',
      expires: '2026-01-02T05:52:08Z',
      hostname: 'AkaalForge-WIN',
      id: '6539396526464404',
      isExternal: false,
      keyExpiryDisabled: false,
      lastSeen: '2025-07-30T06:49:38Z',
      machineKey: 'mkey:5956ca45ae85843fd78d0ab459ff469350d9f8d718fbbd9680642b845a728c19',
      name: 'akaalforge-win.mau-snapper.ts.net',
      nodeId: 'nDD5wkrh4t11CNTRL',
      nodeKey: 'nodekey:0b81c9766a39d5afbb1896aa4ef432afa042dd65a5f0d423ed84cb21a96d3f51',
      os: 'windows',
      tailnetLockError: '',
      tailnetLockKey: 'nlpub:7c86e2e06eabdfaed56483982022b4e52b36748881397f8a517a2cb13068bdc4',
      updateAvailable: true,
      user: 'manmeet-ms@github'
    },
    {
      addresses: [Array],
      authorized: true,
      blocksIncomingConnections: false,
      clientVersion: '1.84.1-t1b829929a-g5ed91b4a9',
      created: '2025-07-06T05:55:29Z',
      expires: '2026-01-02T05:55:29Z',
      hostname: 'localhost',
      id: '6138701327438910',
      isExternal: false,
      keyExpiryDisabled: false,
      lastSeen: '2025-07-30T06:49:38Z',
      machineKey: 'mkey:1acb2fedb038439d49006de1706f7a3f1fc97dfb17594912050184a0a59a347f',
      name: 'vivo-i2223.mau-snapper.ts.net',
      nodeId: 'nZ22KvGEwp11CNTRL',
      nodeKey: 'nodekey:97dce1256cbe48066ed490647e829ef3971d9040c16a4743da2056ef80022119',
      os: 'android',
      tailnetLockError: '',
      tailnetLockKey: 'nlpub:77b64ac78a2fb688e5ea087950bdb8a93fcc3c4f3e7a95658ac03136e5932649',
      updateAvailable: false,
      user: 'manmeet-ms@github'
    }
  ]
}
  const getTailscaleDevices=async ()=> {
  const uri =
    "api/tailscale/devices";
  const result = await api.get("tailscale/devices");

  setDevicesData(result.data)
  console.log(devicesData);
  
}
useEffect(() => {
  getTailscaleDevices()

  
}, [])


  return <div>
    {/* <div>{devicesData}</div> */}
<Button onClick={getTailscaleDevices} >getDevices</Button>
 <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Device</TableHead>
            <TableHead>Last Seen</TableHead>
            <TableHead>Status</TableHead>

           {/*  <TableHead>Type</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          
          {(devicesData!==null?devicesData:demoDataDevices).devices.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{dayjs(data.lastSeen).format("MMM D, YYYY HH:MM")}</TableCell>

              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><InfoIcon className="inline size-4 mr-1 opacity-60 text-primary" /></TooltipTrigger>
                    <TooltipContent>
                      <p>{data.os}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {data.hostname}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
  </div>;
};

export default OnlineDevices;
