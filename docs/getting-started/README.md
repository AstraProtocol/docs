
# Astra Testnet: Running Nodes

The latest https://astranaut.network/ EVM Chain Testnet has been named as **Astra**.

This is a detailed documentation for setting up a Validator or a full node on Astra testnet `astra_11110-1`.

## Pre-requisites

### Supported OS

We officially support macOS, Windows and Linux only. Other platforms may work but there is no guarantee. We will extend our support to other platforms after we have stabilized our current architecture.

### Prepare your machine

- To run Cronos testnet nodes, you will need a machine with the following minimum requirements:

    - 4-core, x86_64/ARM architecture processor;
    - 16 GB RAM;
    - 500 GB of storage space.

## Step 1. Installation astra

## Install Go

::: warning
Astra is built using [Go](https://golang.org/dl/) version `1.17.5+`
:::

```bash
go version
```

:::tip
If the `astrad: command not found` error message is returned, confirm that your [`GOPATH`](https://golang.org/doc/gopath_code#GOPATH) is correctly configured by running the following command:

```bash
export PATH=$PATH:$(go env GOPATH)/bin
```

:::
## Install Binaries

::: tip
The latest {{ $themeConfig.project.name }} [version](https://github.com/AstraProtocol/astra/releases) is `{{ $themeConfig.project.binary }} {{ $themeConfig.project.latest_version }}`
:::

### GitHub

Clone and build {{ $themeConfig.project.name }} using `git`:

```bash
git clone https://github.com/AstraProtocol/astra.git
cd astra
make install
```

Check that the `{{ $themeConfig.project.binary }}` binaries have been successfully installed:

```bash
astrad version
```

## Step 2. Configure `astrad`

### Step 2-0 (Optional) Clean up the old blockchain data

- If you have joined `astra_11110-1` before, you would have to clean up the old blockchain data and start over again, it can be done by running:

  ```bash
  $ ./astrad unsafe-reset-all
  ```

  and remove the old genesis file by

  ```bash
  $ rm ~/.astra/config/genesis.json
  ```

Before kick-starting your node, we will have to configure your node so that it connects to the Cronos testnet:

### Step 2-1 Initialize `astrad`

- First of all, you can initialize astrad by:

  ```bash
    $ ./astrad init [moniker] --chain-id astra_11110-1
  ```

  This `moniker` will be the displayed id of your node when connected to the Astra network.
  When providing the moniker value, make sure you drop the square brackets since they are not needed.
  The example below shows how to initialize a node named `pegasus-node` :

  ```bash
    $ ./astrad init pegasus-node --chain-id astra_11110-1
  ```

  ::: tip NOTE

    - Depending on your cronosd home setting, the cronosd configuration will be initialized to that home directory. To simply the following steps, we will use the default cronosd home directory `~/.astra/` for illustration.
    - You can also put the `astrad` to your binary path and run it by `astrad`
      :::

### Step 2-2 Configure astrad

- Download and replace the Astra Testnet `genesis.json` by:

  ```bash
  $ curl https://raw.githubusercontent.com/AstraProtocol/testnets/main/astra_11110-1/genesis.json > ~/.astra/config/genesis.json
  ```

- Verify sha256sum checksum of the downloaded `genesis.json`. You should see `OK!` if the sha256sum checksum matches.

  ```bash
  $ if [[ $(sha256sum ~/.astra/config/genesis.json | awk '{print $1}') = "" ]]; then echo "OK"; else echo "MISMATCHED"; fi;

  OK!
  ```

  ::: tip NOTE

    - For Mac environment, `sha256sum` was not installed by default. In this case, you may setup `sha256sum` with this command:

      ```bash
      function sha256sum() { shasum -a 256 "$@" ; } && export -f sha256sum
      ```

      :::

- (Validator node only) In `~/.astra/config/app.toml`, update minimum gas price to avoid [transaction spamming](https://github.com/cosmos/cosmos-sdk/issues/4527)

  ```bash
  $ sed -i.bak -E 's#^(minimum-gas-prices[[:space:]]+=[[:space:]]+).*$#\1"5000000000000basetcro"#' ~/.cronos/config/app.toml
  ```

- For network configuration, in `~/.cronos/config/config.toml`, validator nodes need to modify the configurations of `persistent_peers`, `create_empty_blocks_interval` and `timeout_commit`. For non-validator full nodes, only `persistent_peers` modification is required:
  ```bash
  $ sed -i.bak -E 's#^(persistent_peers[[:space:]]+=[[:space:]]+).*$#\1"8fcba3485c67a2a00a383b6f45660a4ac529c6ca@52.77.30.18:26656,e65199bc579ffd89d7c021c5611f9f1c97f7ff13@54.251.209.254:26656"#' ~/.cronos/config/config.toml
  $ sed -i.bak -E 's#^(create_empty_blocks_interval[[:space:]]+=[[:space:]]+).*$#\1"5s"#' ~/.cronos/config/config.toml
  $ sed -i.bak -E 's#^(timeout_commit[[:space:]]+=[[:space:]]+).*$#\1"5s"#' ~/.cronos/config/config.toml
  ```

::: tip NOTE

- For Mac environment, if `jq` is missing, you may install it by: `brew install jq`
  :::

## Step 3. Run everything

::: warning CAUTION
This page only shows the minimal setup for validator / full node.

Furthermore, you may want to run full nodes
as sentries (see [Tendermint](https://docs.tendermint.com/master/tendermint-core/running-in-production.html)), restrict your validator connections to only connect to your full nodes, test secure storage of validator keys etc.
:::

Once the `cronosd` has been configured, we are ready to start the node and sync the blockchain data:

- Start cronosd, e.g.:

```bash
  $ ./cronosd start
```

::: tip Remarks:
If you see errors saying `too many files opened...`, then you need to set a higher number for maximum open file descriptors in your OS.

If you are on OSX or Linux, then the following could be useful:

```bash
# Check current max fd
$ ulimit -n
# Set a new max fd
$ ulimit -Sn [NEW_MAX_FILE_DESCRIPTOR]
# Example
$ ulimit -Sn 4096
```

:::

- _(Optional for Linux)_ Start cronosd with systemd service, e.g.:

```bash
  $ curl -s https://raw.githubusercontent.com/crypto-org-chain/cronos-docs/master/systemd/create-service.sh -o create-service.sh && curl -s https://raw.githubusercontent.com/crypto-org-chain/cronos-docs/master/systemd/cronosd.service.template -o cronosd.service.template
  $ chmod +x ./create-service.sh && ./create-service.sh
  $ sudo systemctl start cronosd
  # view log
  $ journalctl -u cronosd -f
```

:::details Example: /etc/systemd/system/cronosd.service created by script

```bash
# /etc/systemd/system/cronosd.service
[Unit]
Description=cronosd
ConditionPathExists=/usr/local/bin/cronosd
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/usr/local/bin
ExecStart=/usr/local/bin/cronosd start --home /home/ubuntu/.cronos
Restart=on-failure
RestartSec=10
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
```

:::

It should begin fetching blocks from the other peers. Please wait until it is fully synced before moving onto the next step.

- You can query the node syncing status by

  ```bash
  $ ./cronosd status 2>&1 | jq '.SyncInfo.catching_up'
  ```

  If the above command returns `false`, It means that your node **is fully synced**; otherwise, it returns `true` and implies your node is still catching up.

- One can check the current block height by querying the public full node by:

  ```bash
  curl -s https://evm-t3.cronos.org/:26657/commit | jq "{height: .result.signed_header.header.height}"
  ```

  and you can check your node's progress (in terms of block height) by

  ```bash
  $ ./cronosd status 2>&1 | jq '.SyncInfo.latest_block_height'
  ```

## Cronos testnet faucet and explorer

- You can lookup data within the `cronostestnet_338-3` network by the [explorer](https://cronos.org/explorer/testnet3);

- To interact with the blockchain, simply use the [test-token faucet](https://cronos.org/faucet) to obtain test CRO tokens for performing transactions on the **Cronos** testnet.

    - Users can use the [faucet](https://cronos.org/faucet) to obtain test tokens, please note that you would need a Ethereum type address `0x...` that can be obtained by [Using metamask](./metamask.md#using-metamask-on-cronos-testnet).

In case you have reached the daily limit on faucet , you can simply send a message on [Discord](https://discord.gg/pahqHz26q4) #request-tcro channel ,
stating who you are and your `0x...` address.
