import * as grpc from '@grpc/grpc-js';
import { connect, Contract, Identity, Signer, signers } from '@hyperledger/fabric-gateway';
import * as crypto from 'crypto';
import * as path from 'path';

import { promises as fs } from 'fs';

const channelName = 'mychannel';

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const WORKSHOP_CRYPTO = envOrDefault('CRYPTO_PATH', path.resolve(__dirname, '..', '..', '..', 'fabric-samples', 'full-stack-asset-transfer-guide', 'infrastructure', 'sample-network', 'temp'));
// const WORKSHOP_CRYPTO = //your workshop crypto path

export class Connection {
  public contract?: Contract;
  private org: string;
  private user: string;
  private gateway: any;

  constructor(org: string, user: string) {
    this.org = org;
    this.user = user;
  }

  public async init() {
    const client = await this.newGrpcConnection();
    try {
      this.gateway = connect({
        client,
        identity: await this.newIdentity(),
        signer: await this.newSigner(),
        // Default timeouts for different gRPC calls
        evaluateOptions: () => {
          return { deadline: Date.now() + 5000 }; // 5 seconds
        },
        endorseOptions: () => {
          return { deadline: Date.now() + 15000 }; // 15 seconds
        },
        submitOptions: () => {
          return { deadline: Date.now() + 5000 }; // 5 seconds
        },
        commitStatusOptions: () => {
          return { deadline: Date.now() + 60000 }; // 1 minute
        },
      });
      const network = this.gateway.getNetwork(channelName);

      this.contract = network.getContract('vegetable-transfer');
    }
    catch (error) {
      console.error('Could not connect to gateway', error);
    }
  }

  public close() {
    if (this.gateway) {
      this.gateway.close();
      console.log('Gateway closed');
    }
  }

  private async newIdentity(): Promise<Identity> {
    let mspId = `${this.org}MSP`;

    //FIXME: mega carpeala asta, dar merge, 
    //organizatia e Org1MSP/Org2MSP si this.org paseaza org1/org2
    mspId = capitalizeFirstLetter(mspId);

    console.log(mspId)
    const certPath = `${WORKSHOP_CRYPTO}/enrollments/${this.org}/users/${this.user}/msp/signcerts/cert.pem`;
    const credentials = await fs.readFile(certPath);
    return { mspId, credentials };
  }

  private async newGrpcConnection(): Promise<grpc.Client> {
    console.log(this.org, this.user)
    const tlsCertPath = `${WORKSHOP_CRYPTO}/channel-msp/peerOrganizations/${this.org}/msp/tlscacerts/tlsca-signcert.pem`;
    const tlsRootCert = await fs.readFile(tlsCertPath);
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);

    const peerEndpoint = `test-network-${this.org}-peer1-peer.vegchain.tech:443`;
    const peerHostAlias = `test-network-${this.org}-peer1-peer.vegchain.tech`;

    return new grpc.Client(peerEndpoint, tlsCredentials, {
      'grpc.ssl_target_name_override': peerHostAlias,
    });
  }

  private async newSigner(): Promise<Signer> {
    const keyPath = `${WORKSHOP_CRYPTO}/enrollments/${this.org}/users/${this.user}/msp/keystore/key.pem`;
    const privateKeyPem = await fs.readFile(keyPath);
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return signers.newPrivateKeySigner(privateKey);
  }
}

// export const withConnection = async (org: string, user: string, callback: (contract: Contract) => Promise<any>): Promise<any> => {
//   const connection = new Connection(org, user);
//   try {
//     await connection.init();
//     const result = await callback(connection.contract!);
//     return result;
//   } catch (error) {
//     console.error('Error during withConnection:', error);
//     throw error;
//   } finally {
//     if (connection) {
//       connection.close();
//     }
//   }
// };
//
/**
 * envOrDefault() will return the value of an environment variable, or a default value if the variable is undefined.
 */
function envOrDefault(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}
