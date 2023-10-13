package lightning

type aesSuccessActionDataDecryptedDto struct {
	Description string `json:"description"`
	Plaintext   string `json:"plaintext"`
}

type bitcoinAddressDataDto struct {
	Address   string  `json:"address"`
	Network   string  `json:"network"`
	AmountSat *uint64 `json:"amountSat"`
	Label     *string `json:"label"`
	Message   *string `json:"message"`
}

type closedChannelPaymentDetailsDto struct {
	ShortChannelId string `json:"shortChannelId"`
	State          string `json:"state"`
	FundingTxid    string `json:"fundingTxid"`
}

type messageSuccessActionDataDto struct {
	Message string `json:"message"`
}

type nodeStateDto struct {
	Id                         string                        `json:"id"`
	BlockHeight                uint32                        `json:"blockHeight"`
	ChannelsBalanceMsat        uint64                        `json:"channelsBalanceMsat"`
	OnchainBalanceMsat         uint64                        `json:"onchainBalanceMsat"`
	Utxos                      []unspentTransactionOutputDto `json:"utxos"`
	MaxPayableMsat             uint64                        `json:"maxPayableMsat"`
	MaxReceivableMsat          uint64                        `json:"maxReceivableMsat"`
	MaxSinglePaymentAmountMsat uint64                        `json:"maxSinglePaymentAmountMsat"`
	MaxChanReserveMsats        uint64                        `json:"maxChanReserveMsats"`
	ConnectedPeers             []string                      `json:"connectedPeers"`
	InboundLiquidityMsats      uint64                        `json:"inboundLiquidityMsats"`
}

type lnInvoiceDto struct {
	Bolt11          string         `json:"bolt11"`
	PayeePubkey     string         `json:"payeePubkey"`
	PaymentHash     string         `json:"paymentHash"`
	Description     *string        `json:"description"`
	DescriptionHash *string        `json:"descriptionHash"`
	AmountMsat      *uint64        `json:"amountMsat"`
	Timestamp       uint64         `json:"timestamp"`
	Expiry          uint64         `json:"expiry"`
	RoutingHints    []routeHintDto `json:"routingHints"`
	PaymentSecret   []uint8        `json:"paymentSecret"`
}

type lnPaymentDetailsDto struct {
	PaymentHash           string       `json:"paymentHash"`
	Label                 string       `json:"label"`
	DestinationPubkey     string       `json:"destinationPubkey"`
	PaymentPreimage       string       `json:"paymentPreimage"`
	Keysend               bool         `json:"keysend"`
	Bolt11                string       `json:"bolt11"`
	LnurlSuccessAction    *typeDataDto `json:"lnurlSuccessAction"`
	LnurlMetadata         *string      `json:"lnurlMetadata"`
	LnAddress             *string      `json:"lnAddress"`
	LnurlWithdrawEndpoint *string      `json:"lnurlWithdrawEndpoint"`
}

type lnUrlAuthRequestDataDto struct {
	K1     string  `json:"k1"`
	Action *string `json:"action"`
	Domain string  `json:"domain"`
	Url    string  `json:"url"`
}

type lnUrlErrorDataDto struct {
	Reason string `json:"reason"`
}

type lnUrlPayRequestDataDto struct {
	Callback       string  `json:"callback"`
	MinSendable    uint64  `json:"minSendable"`
	MaxSendable    uint64  `json:"maxSendable"`
	MetadataStr    string  `json:"metadataStr"`
	CommentAllowed uint16  `json:"commentAllowed"`
	Domain         string  `json:"domain"`
	LnAddress      *string `json:"lnAddress"`
}

type lnUrlWithdrawRequestDataDto struct {
	Callback           string `json:"callback"`
	K1                 string `json:"k1"`
	DefaultDescription string `json:"defaultDescription"`
	MinWithdrawable    uint64 `json:"minWithdrawable"`
	MaxWithdrawable    uint64 `json:"maxWithdrawable"`
}

type paymentDto struct {
	Id          string      `json:"id"`
	PaymentType string      `json:"paymentType"`
	PaymentTime int64       `json:"paymentTime"`
	AmountMsat  uint64      `json:"amountMsat"`
	FeeMsat     uint64      `json:"feeMsat"`
	Status      string      `json:"status"`
	Description *string     `json:"description"`
	Details     typeDataDto `json:"details"`
}

type routeHintDto struct {
	Hops []routeHintHopDto `json:"hops"`
}

type routeHintHopDto struct {
	SrcNodeId                  string  `json:"srcNodeId"`
	ShortChannelId             uint64  `json:"shortChannelId"`
	FeesBaseMsat               uint32  `json:"feesBaseMsat"`
	FeesProportionalMillionths uint32  `json:"feesProportionalMillionths"`
	CltvExpiryDelta            uint64  `json:"cltvExpiryDelta"`
	HtlcMinimumMsat            *uint64 `json:"htlcMinimumMsat"`
	HtlcMaximumMsat            *uint64 `json:"htlcMaximumMsat"`
}

type statusDto struct {
	Pubkey        string `json:"pubkey"`
	BlockHeight   uint32 `json:"blockHeight"`
	Synced        bool   `json:"synced"`
	LocalBalance  uint64 `json:"localBalance"`
	RemoteBalance uint64 `json:"remoteBalance"`
}

type typeDataDto struct {
	Type string      `json:"type"`
	Data interface{} `json:"data"`
}

type unspentTransactionOutputDto struct {
	Txid               []uint8 `json:"txid"`
	Outnum             uint32  `json:"outnum"`
	AmountMillisatoshi uint64  `json:"amountMillisatoshi"`
	Address            string  `json:"address"`
	Reserved           bool    `json:"reserved"`
}

type urlSuccessActionDataDecryptedDto struct {
	Description string `json:"description"`
	Url         string `json:"url"`
}