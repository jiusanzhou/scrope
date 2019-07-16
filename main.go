package main

import (
	"go.zoe.im/x/cli"

	"go.zoe.im/scrope/cmd"
)

func main() {
	cmd.Run(cli.Version(Version))
}
