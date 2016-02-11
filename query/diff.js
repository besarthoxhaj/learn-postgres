/**
 * Case scenario:
 * need to sync notifications present on device with the ones in
 * postgres. Want to minimize the payload traffic on requests, so
 * only whats needed will be received on device.
 *
 * 1. Send an array of ids to the server.
 * 2. Server checks if other (new) ids are present in postgres
 * 3. Server replies with the new notifications (if present)
 *
 * Solution:
 * Heavy use of the 'WHERE' clause -> 'WHERE condition'
 * where condition is any expression that evaluates to a result of type boolean.
 * Any row that does not satisfy this condition will be eliminated from the output.
 * A row satisfies the condition if it returns true when the actual row values are substituted for any variable references.
 *
 * SELECT * FROM "test" WHERE "id" NOT IN (1,2);
 */

'use strict';


