#!/bin/sh

echo "run_id: $RUN_ID"

# -----------------------------
# PROXY CONFIGURATION
# -----------------------------
# Set local proxy if needed for external traffic
export HTTP_PROXY=http://localhost:3128

# Bypass Squid for internal domains
export NO_PROXY=.cdp-int.defra.cloud,localhost,127.0.0.1

# -----------------------------
# RUN TESTS
# -----------------------------
if [ "$REMOTE_CHROME" = "true" ]; then
  echo "Running tests on remote Chrome"
  npm run test
else
  echo "Running tests on BrowserStack"
  npm run test:cdp:browserstack
fi

# -----------------------------
# PUBLISH TEST REPORT
# -----------------------------
npm run report:publish
publish_exit_code=$?

if [ $publish_exit_code -ne 0 ]; then
  echo "Failed to publish test results"
  exit $publish_exit_code
fi

# -----------------------------
# CHECK FOR FAILED TESTS
# -----------------------------
if [ -f FAILED ]; then
  echo "Test suite failed"
  cat ./FAILED
  exit 1
fi

echo "Test suite passed"
exit 0
