const awsServices = require("@aws-sdk/client-secrets-manager")
module.exports = async function getSecrets(key) {
  const REGION = "us-east-1";

  const secret_name = "crowdcontract";

  const client = new awsServices.SecretsManagerClient({
    region: REGION,
  });
  try {
    await client
      .send(
        new awsServices.GetSecretValueCommand({
          SecretId: secret_name,
          VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
        })
      )
      .then((response) =>
        JSON.stringify(JSON.parse(response.SecretString)[key])
      );
  } catch (error) {
    console.log(error);
    throw error;
  }
}