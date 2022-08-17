'use strict';

function requirePerPriority({ priorityList, loader, params }) {
  priorityList.forEach(priority => {
    loader({ priority, params });
  });
}

requirePerPriority.priority = 1;
module.exports = requirePerPriority;
