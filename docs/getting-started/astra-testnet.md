---
meta:
  - name: "title"
    content: Astra Running Nodes On Testnet
  - name: "description"
    content: Learn how to setup a Validator or a full node on Astra testnet astra_11110-1 in this technical documentation.
  - name: "og:title"
    content: Astra Running Nodes On Testnet
  - name: "og:type"
    content: Website
  - name: "og:description"
    content: Learn how to setup a Validator or a full node on Astra testnet astra_11110-1 in this technical documentation.
  # - name: "og:image"
  #   content: https://cronos.org/og-image.png
  - name: "twitter:title"
    content: Astra Running Nodes On Testnet
  - name: "twitter:site"
    content: "@AstraProtocol"
  - name: "twitter:card"
    content: summary_large_image
  - name: "twitter:description"
    content: Learn how to setup a Validator or a full node on Astra testnet astra_11110-1 in this technical documentation.
#   - name: "twitter:image"
#     content: https://cronos.org/og-image.png
# canonicalUrl: https://cronos.org/docs/getting-started/cronos-testnet.html
---


# Astra Testnet: Running Nodes

The latest https://astranaut.network/ EVM Chain Testnet has been named as **Astra**.

This is a detailed documentation for setting up a Validator or a full node on Astra testnet `astra_11112-1`.

## Pre-requisites

### Supported OS

We officially support macOS, Windows and Linux only. Other platforms may work but there is no guarantee. We will extend our support to other platforms after we have stabilized our current architecture.

### Prepare your machine

- To run Astra testnet nodes, you will need a machine with the following minimum requirements:

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

::: warning
If the `astrad: command not found` error message is returned, confirm that your [`GOPATH`](https://golang.org/doc/gopath_code#GOPATH) is correctly configured by running the following command:

```bash
export PATH=$PATH:$(go env GOPATH)/bin
```
:::
## Install Binaries

### GitHub

Clone and build using `git`:

```bash
git clone https://github.com/AstraProtocol/astra.git
cd astra
make install
```

Check that have been successfully installed:

```bash
astrad version
```

## Step 2. Configure `astrad`

### Step 2-0 (Optional) Clean up the old blockchain data

- If you have joined `astra_11112-1` before, you would have to clean up the old blockchain data and start over again, it can be done by running:

  ```bash
  $ ./astrad unsafe-reset-all
  ```

  and remove the old genesis file by

  ```bash
  $ rm ~/.astra/config/genesis.json
  ```

Before kick-starting your node, we will have to configure your node so that it connects to the Astra testnet:

### Step 2-1 Initialize `astrad`

- First of all, you can initialize astrad by:

  ```bash
    $ ./astrad init [moniker] --chain-id astra_11112-1
  ```

  This `moniker` will be the displayed id of your node when connected to the Astra network.
  When providing the moniker value, make sure you drop the square brackets since they are not needed.
  The example below shows how to initialize a node named `pegasus-node` :

  ```bash
    $ ./astrad init pegasus-node --chain-id astra_11112-1
  ```


### Step 2-2 Configure astrad

- Download and replace the Astra Testnet `genesis.json` by:

  ```bash
  $ curl https://raw.githubusercontent.com/AstraProtocol/testnets/main/astra_11112-1/genesis.json > ~/.astra/config/genesis.json
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
  $ sed -i.bak -E 's#^(minimum-gas-prices[[:space:]]+=[[:space:]]+).*$#\1"0aastra"#' ~/.astra/config/app.toml
  ```

- For network configuration, in `~/.astra/config/config.toml`, validator nodes need to modify the configurations of `seeds`. For non-validator full nodes, only `seeds` modification is required:
  ```bash
  $ sed -i.bak -E 's#^(seeds[[:space:]]+=[[:space:]]+).*$#\1"a7adbfe36dc633c3c93e7deb8a6e4c0d22e821a8@167.71.213.62:26656,68997d1ef6b0a50be156d77fac98ac54e0a73604@157.245.192.163:26656,b44d804ed5d1308c0e31cbb297510d3e259dfcd4@157.245.206.123:26656,b71f816ebd24bbfaa79f2ed820f6cee0aee04aff@167.172.76.193:26656"#'
  $ sed -i.bak -E 's#^(timeout_commit[[:space:]]+=[[:space:]]+).*$#\1"3s"#'
  $ sed -i.bak -E 's#^(timeout_propose[[:space:]]+=[[:space:]]+).*$#\1"2s"#'
  $ sed -i.bak -E 's#^(timeout_propose_delta[[:space:]]+=[[:space:]]+).*$#\1"250ms"#'
  $ sed -i.bak -E 's#^(timeout_precommit[[:space:]]+=[[:space:]]+).*$#\1"500ms"#'
  $ sed -i.bak -E 's#^(timeout_precommit_delta[[:space:]]+=[[:space:]]+).*$#\1"250ms"#'
  $ sed -i.bak -E 's#^(timeout_prevote_delta[[:space:]]+=[[:space:]]+).*$#\1"250ms"#'
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

Once the `astrad` has been configured, we are ready to start the node and sync the blockchain data:

- Start astrad, e.g.:

```bash
  $ ./astrad start
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

- _(Optional for Linux)_ Start astrad with systemd service, e.g.:

```bash
  $ curl -s https://raw.githubusercontent.com/AstraProtocol/docs/main/systemd/create-service.sh -o create-service.sh && curl -s https://raw.githubusercontent.com/AstraProtocol/docs/main/systemd/astrad.service.template -o astrad.service.template
  $ chmod +x ./create-service.sh && ./create-service.sh
  $ sudo systemctl start astrad
  # view log
  $ journalctl -u astrad -f
```

:::details Example: /etc/systemd/system/astrad.service created by script

```bash
# /etc/systemd/system/astrad.service
[Unit]
Description=Astra Node
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root
ExecStart=/root/go/bin/astrad start
Restart=on-failure
RestartSec=3
LimitNOFILE=4096

```

:::

It should begin fetching blocks from the other peers. Please wait until it is fully synced before moving onto the next step.

- You can query the node syncing status by

  ```bash
  $ ./astrad status 2>&1 | jq '.SyncInfo.catching_up'
  ```

  If the above command returns `false`, It means that your node **is fully synced**; otherwise, it returns `true` and implies your node is still catching up.

- You can check your node's progress (in terms of block height) by

  ```bash
  $ ./astrad status 2>&1 | jq '.SyncInfo.latest_block_height'
  ```

## Astra testnet faucet and explorer

- You can lookup data within the `astra_11112-1` network by the [explorer](https://testnet.astranaut.network/astra);
