const ENTRY_TEXT = "TIP: Somewhere in this build, a test you deleted in March is still right about you.";
const USAGE = "Usage: node main.ts [--help]";

type ParsedArgs = { kind: "run" } | { kind: "help" } | { kind: "error"; message: string };

function parseArgs(args: string[]): ParsedArgs {
  if (args.length === 0) return { kind: "run" };
  if (args.length === 1 && args[0] === "--help") return { kind: "help" };
  return { kind: "error", message: `Unknown arguments: ${args.join(" ")}` };
}

function main(args: string[]): void {
  const parsed = parseArgs(args);

  if (parsed.kind === "help") {
    console.error(USAGE);
    return;
  }

  if (parsed.kind === "error") {
    console.error(parsed.message);
    console.error(USAGE);
    process.exitCode = 1;
    return;
  }

  console.log(ENTRY_TEXT);
}

main(process.argv.slice(2));
