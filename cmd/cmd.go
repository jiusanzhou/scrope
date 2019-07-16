package cmd

import (
	"go.zoe.im/x/cli"
)

var (
	// root command to contains all sub commands
	cmd = cli.New(
		// set name and description in run function
		cli.Run(func(c *cli.Command, args ...string) {
			c.Help()
		}),
	)
)

// Run call the global's command run
func Run(opts ...cli.Option) error {
	return cmd.Run(opts...)
}
