import { Request, Response } from "express";
const utf8Decoder = new TextDecoder();
import { Connection } from "./connection";
import db from './db';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import verifyToken from "./middleware";

export interface IGetUserAuthInfoRequest extends Request {
  user?: any;
}


export class AssetRouter {
  public routes(app: any): void {
    app.route("/login")
      .post(async (req: Request, res: Response) => {
        console.log(req.body)
        const { User, Password } = req.body;
        if (!(User && Password)) {
          res.status(400).json({ error: "All input is required" });
          return;
        }

        let user: any[] = [];
        const sql = "SELECT * FROM Users WHERE Username = ?";
        db.all(sql, User, function(err, rows) {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }

          rows.forEach(function(row) {
            user.push(row);
          });

          const PHash = bcrypt.hashSync(Password, user[0].Salt);
          if (PHash !== user[0].Password) {
            res.status(400).json({ error: "Username or Password incorrect" });
            return;
          }


          // Generate and assign token
          const token = jwt.sign(
            { user_id: user[0].Id, username: user[0].Username, organization: user[0].Organization, User },
            process.env.TOKEN_KEY as string,
            { expiresIn: "2d" }
          );

          const sanitizedUser = {
            username: user[0].Username,
            token: token,
            organization: user[0].Organization
          }

          user[0].Token = token;
          res.status(200).send(sanitizedUser);
        });
      });

    app.route('/list')
      .get(verifyToken, async (req: IGetUserAuthInfoRequest, res: Response) => {
        const username = req.user.username;
        const org = req.user.organization;

        let connection = new Connection(org, username);
        try {
          await connection.init();

          const resultBytes = await connection.contract!.evaluateTransaction('GetAllAssets');
          const resultJson = utf8Decoder.decode(resultBytes);

          res.status(200).send(JSON.parse(resultJson));

        } catch (error: any) {
          res.status(500).send({ error: error.message });

        } finally {
          if (connection) {
            connection.close(); // Close connection after using it
          }
        }
      });

    app.route('/create')
      .post(verifyToken, async (req: IGetUserAuthInfoRequest, res: Response) => {
        const username = req.user.username;
        const org = req.user.organization;

        var json = JSON.stringify({
          ID: req.body.ID,
          Type: req.body.Type,
          Quantity: Number(req.body.Quantity),
          HarvestDate: req.body.HarvestDate,
          Owner: req.body.Owner,
          Location: req.body.Location,
          ExpirationDate: req.body.ExpirationDate,
          QualityRating: Number(req.body.QualityRating),
        })
        console.log(JSON.parse(json))
        let connection = new Connection(org, username);
        try {
          await connection.init();

          const result = await connection.contract!.submitAsync('CreateAsset', {
            arguments: [json]
          });

          const status = await result.getStatus();
          if (!status.successful) {
            throw new Error(`failed to commit transaction ${status.transactionId} with status code ${status.code}`);
          }
          res.status(200).send({ message: "Asset Created" });
          console.log(status)

        } catch (error: any) {
          res.status(500).send({ message: error });
        } finally {
          if (connection) {
            connection.close(); // Close connection after using it
          }
        }
      });

    app.route('/update')
      .post(verifyToken, async (req: IGetUserAuthInfoRequest, res: Response) => {
        const username = req.user.username;
        const org = req.user.organization;

        var json = JSON.stringify({
          ID: req.body.ID,
          Type: req.body.Type,
          Quantity: Number(req.body.Quantity),
          HarvestDate: req.body.HarvestDate,
          Owner: req.body.Owner,
          Location: req.body.Location,
          ExpirationDate: req.body.ExpirationDate,
          QualityRating: Number(req.body.QualityRating),
        })

        let connection = new Connection(org, username);
        try {
          await connection.init();

          const result = await connection.contract!.submitAsync('UpdateAsset', {
            arguments: [json]
          });

          const status = await result.getStatus();
          if (!status.successful) {
            throw new Error(`failed to commit transaction ${status.transactionId} with status code ${status.code}`);
          }
          res.status(200).send({ message: "Asset Updated" });
          console.log(status)


        } catch (error: any) {
          res.status(500).send({ error: error.details[0].message });

        } finally {
          if (connection) {
            connection.close(); // Close connection after using it
          }
        }
      })
    app.route('/delete')
      .post(verifyToken, async (req: IGetUserAuthInfoRequest, res: Response) => {
        const username = req.user.username;
        const org = req.user.organization;

        let connection = new Connection(org, username);
        try {
          await connection.init();

          const result = await connection.contract!.submitAsync('DeleteAsset', {
            arguments: [req.body.ID],
          });
          const status = await result.getStatus();
          if (!status.successful) {
            throw new Error(`failed to commit transaction ${status.transactionId} with status code ${status.code}`);
          }
          res.status(200).send({ message: "Asset deleted successfully" });
          console.log(status)

        } catch (error: any) {
          res.status(500).send({ error: error.details[0].message });

        } finally {
          if (connection) {
            connection.close(); // Close connection after using it
          }
        }
      })

    app.route('/transfer')
      .post(verifyToken, async (req: IGetUserAuthInfoRequest, res: Response) => {
        const username = req.user.username;
        const org = req.user.organization;

        let connection = new Connection(org, username);
        try {
          await connection.init();

          console.log(req.body.ID, req.body.newOwner, req.body.newOwnerOrg)
          const result = await connection.contract!.submitAsync('TransferAsset', {
            arguments: [
              req.body.ID, req.body.newOwner, req.body.newOwnerOrg
            ]
          }
          );

          const status = await result.getStatus();
          if (!status.successful) {
            throw new Error(`failed to commit transaction ${status.transactionId} with status code ${status.code}`);
          }
          res.status(200).send({ message: "Asset deleted successfully" });
          console.log(status)

        } catch (error: any) {
          res.status(500).send({ error: error.details[0].message });

        } finally {
          if (connection) {
            connection.close(); // Close connection after using it
          }
        }
      })
    app.route('/get/:id')
      .get(verifyToken, async (req: IGetUserAuthInfoRequest, res: Response) => {
        const username = req.user.username;
        const org = req.user.organization;
        let id = req.params.id;

        console.log('\n--> Evaluate Transaction: ReadAsset, function returns asset attributes');

        let connection = new Connection(org, username);
        try {
          await connection.init();

          const resultBytes = await connection.contract!.evaluateTransaction('ReadAsset', id);

          const resultJson = utf8Decoder.decode(resultBytes);

          res.status(200).send(JSON.parse(resultJson));

        } catch (error: any) {
          res.status(500).send({ error: error.details[0].message });

        } finally {
          if (connection) {
            connection.close(); // Close connection after using it
          }
        }
      })
  }

}
