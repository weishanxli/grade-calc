# JSON Pruner

This assignment will have you write a short command-line program in Python that
parses specific values out of JSON input and formats the output in a
human-readable way.

## Specification

The submitted program should be a single file named `prune_json.py`. Submitting
tests for your code is optional, but if you do, they should be archived with the
submission as a tar and compressed with LZMA (`.tar.xz`). Please note that, if
you do submit unit tests, they will be graded as part of your submission.

The language in this assignment follows terminology conventions from the JSON
specification, available at [json.org](https://www.json.org).

### System requirements

The program should be written in any stable Python version 3.6 or later. If you
end up using any features specific to versions newer than 3.6, note them in a
top-level docstring.

The program should be compilable by CPython. It should be compatible with any
common GNU/Linux distribution; that is to say no system dependencies save the
appropriate interpreter and a POSIX-compliant shell.

The program may not have any dependencies outside of the standard library.
Conversely, any module in the standard library may be used. Tests, if submitted,
may use third-party libraries. If any third-party libraries are used, please
include a [PEP-518](https://www.python.org/dev/peps/pep-0518/)-compliant
`pyproject.toml` file with the appropriate specification.

### Input

The program should take in two arguments from stdin. The first argument
(hereafter referred to as "input JSON") should be a JSON file. The input JSON
can be any valid JSON, nested up to a depth of 500. The second argument
(hereafter referred to as "match strings") should be a space-separated list of
strings.

### Output

The program should output a subset of the input JSON (hereafter referred to as
"output JSON") to stdout.

The output JSON should contain only values from the input JSON that fulfill one
of the following conditions:

* The value exactly matches one of the match strings
* The value is an object or array that, at any depth, contains a value that
  exactly matches one of the match strings. If an object or array contains both
  matching and non-matching values (at any depth), output the object or array
  with only the matching values. In this case, names should be displayed if the
  corresponding value matches.

Non-string values cannot be matched and, as such, should never appear in the
output JSON with the exception of objects and arrays that meet the latter criterion.

The program should not output any values if there are no matching values.

### Formatting

The JSON output should use 4 spaces for indentation. All syntactic
brackets/braces should be on their own lines unless they directly follow a name
in an object or are followed by a comma. All commas should be followed by a
newline. All syntactic colons in objects should be followed by a single space.
The output should include a single trailing newline, even when no values match.

### Exit Codes

The program should return an exit code, indicating the program result as
follows:

| Code        | Meaning                      |
|:-----------:|:----------------------------:|
| 0           | At least one match found     |
| 1           | No matches found             |
| 2           | Input JSON not found         |
| 3           | Input JSON invalid           |
| 4 - 255     | Implementer Defined          |

Any additional error not covered above should be assigned an exit code in the
"Implementer Defined" range. The meaning of this code should be documented in
a top-level docstring.

In the case of a non-zero exit code, the program should output a single newline
to stdout. Other text describing the error is optional, but must be sent to
stderr.

## Examples

```
$ cat example.json
{"ant": "bat", "cat": "dog", "elk": ["fox", {"gnu": "hen"}]}
```

```
$ python3.9 prune_json.py example.json dog hen
{
    "cat": "dog",
    "elk": [
        {
            "gnu": "hen"
        }
    ]
}
$ echo $?
0
```

```
$ python3.9 prune_json.py example.json foo

$ echo $?
1
```

```
$ python3.9 prune_json.py corrupted.json foo > output.txt
Invalid JSON!
$ echo $?
3
$ cat output.txt
$
```

## Extra Credit

Make the program work up to a nesting depth of 20000. Please note that this makes
the problem significantly more difficult and is truly extra credit. Not attempting
it will not count against you.

If the extra credit is attempted, please indicate so in a top-level docstring.
Please also provide a `--compact` flag that removes all newlines and indentation
from the output formatting.

## Evaluation

The most important thing we're looking for from a submission on this assignment
is demonstrated comprehension of the specification. A key part of any role on a
validation team is reading comprehension and adherence to documentation.
Mistakes that demonstrate a lack of understanding of the JSON specification, or
that fail to produce output matching the above examples, will be looked upon
unfavorably.

After perusing the submission, we run the program through a testing suite to
catch errors in logic and implementation. While testing success should be a
priority, a secondary goal should be clean, lucid code. Keep in mind the
human reading it!

If you submit unit tests, they will be judged on coverage and correctness. A
test suite that does not cover the above specification, or tests that do not
catch bugs that they purport to, will be regarded as an error.

If you submit the extra credit, please ensure that it doesn't come at the
expense of the above. A pile of spaghetti code that solves the extra credit but
fails on valid JSON will not impress us.

## Time Expectations

While there are no concrete time requirements for submissions, we do not expect
any candidate to work on this problem for more than two hours. Our engineers
averaged a little less than an hour to solve this problem when testing the
assignment.
